import React, { useCallback, useState } from 'react'
import './Home.css'
import { AiOutlineClose } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import api from 'axios'
import Loader from '../Loader/Loader';

const Home = () => {
    const [modal,setModal] = useState(false);
    const [uploadedFile,setUploadedFile] = useState(null);
    const [res,setRes] = useState(null);
    const [data,setData] = useState('');
    const [content,setContent] = useState('');
    const [loading,setLoading] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
        if(acceptedFiles.length===0){
            toast.warn('Not Uploaded!!')
        }
        else{
            const file = acceptedFiles[0]
            const extension  = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
            if(extension === 'jpg' ||  extension === 'png' || extension === 'jpeg'){
                setData(acceptedFiles[0])
                const reader = new FileReader();
                reader.onload = () => {
                    setUploadedFile(reader.result);
                };
                reader.readAsDataURL(file);
            }
            else toast.warn('Only JPG, PNG, JPEG Files are accepted!!') 
        }
      }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,maxFiles:1,accept: 'image/jpeg, image/png, image/jpg'});

    const handleDetect = async()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append('file', data);
        try {
            const response = await api.post('http://localhost:5000/api/upload', {
                img:uploadedFile
            });
            console.log(response.data.img)
            setRes(response.data.img)
            setContent(response.data.data)
        } catch (error) {
        toast.warn('Network error:', error);
        }
        finally{
            setLoading(false)
        }
    }
    const handleModalClose = ()=>{
        setModal(false);
        setData('')
        setUploadedFile(null);
        setContent('')
        setLoading(false)
        setRes(null)
    }
    const handleTryAgain = ()=>{
        setData('')
        setUploadedFile(null);
        setContent('')
        setLoading(false)
        setRes(null)
    }
  return (
    <div className="home">
        <header>
            <h1>Detectify</h1>
            <button onClick={()=>setModal(true)}>Get Started</button>
        </header>
        <div className="hero">
            <div className="left">
                <h3>Empowering Object, Detection with OpenCV</h3>
                <p>Detectify is an innovative object detection tool harnessing the power of OpenCV to accurately identify objects within images. Leveraging advanced computer vision algorithms, Detectify provides users with a seamless solution to detect a wide array of objects in any given image. </p>
                <button onClick={()=>setModal(true)}>TryNow</button>
            </div>
            <div className="right">
                <img className='before' src={require('../../Assets/PublicTransport.jpg')}/>
                <div className="line"></div>
                <img className='after' src={require('../../Assets/output.png')}/>
            </div>
        </div>
        {
            modal &&  
            <div className="modal">
                {
                    loading?<Loader/>:
                    uploadedFile===null?
                    <div className='modalUpload'>
                        <AiOutlineClose className='icon' onClick={handleModalClose}/>
                        <div className="top">
                            <h3>Upload Your Files</h3>
                            <h5>in JPG, PNG, JPEG</h5>
                        </div>
                        <div {...getRootProps()} className="dndContainer">
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag & drop files here, or click to select files</p>
                            }
                        </div>
                    </div>:
                    <div className="modalsubmit">
                        <AiOutlineClose className='icon' onClick={handleModalClose}/>
                        {
                            res===null?
                            <>
                            <img src={uploadedFile}/>
                            <div className="btns">
                                <button onClick={handleDetect}>Detect</button>
                                <button onClick={handleTryAgain}>Clear Selection</button>
                            </div>
                            </>
                            :
                            <>
                            <div className="images">
                                <div className="img">
                                    <img src={uploadedFile}/>
                                    <h3>Before</h3>
                                </div>
                                <div className="img">
                                    <img src={`data:image/jpeg;base64,${res}`} />
                                    <h3>After</h3>
                                </div>
                            </div>
                            <div className="content">
                                <h3>All Objects</h3>
                                {
                                    content.map((val,key)=>(
                                        <h5>{key+1} : {val}</h5>
                                    ))
                                }
                                <h3>Total Number of Objects: {content.length}</h3>
                            </div>
                            <button onClick={handleTryAgain}>Try Again</button>
                            </>
                        }
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default Home