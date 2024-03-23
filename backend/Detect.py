import cv2
import numpy as np
from PIL import Image
import base64


def detect_objects(val):
    config_file = "ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
    frozen_model = "frozen_inference_graph.pb"
    model = cv2.dnn_DetectionModel(frozen_model,config_file)
    classLabels = []
    file_name = 'coco.names'
    with open(file_name,'rt') as fpt:
        classLabels = fpt.read().rstrip('\n').split('\n')

    model.setInputSize(320,320)
    model.setInputScale(1.0/127.5)
    model.setInputMean((127.5,127.5,127.5))
    model.setInputSwapRB(True)
    imgData = np.frombuffer(val, np.uint8)
    img = cv2.imdecode(imgData,cv2.IMREAD_COLOR)
    classIndex, confidence, bbox = model.detect(img,confThreshold = 0.5)
    font_scale = 1;
    font = cv2.FONT_HERSHEY_TRIPLEX
    arr = []
    for classIndex, conf, boxes in zip(classIndex.flatten(),confidence.flatten(),bbox):
        cv2.rectangle(img,boxes,(255,0,0),2)
        cv2.putText(img,str(len(arr)+1),(boxes[0]+10,boxes[1]+40),font,fontScale=font_scale,color=(0,255,0),thickness=1)
        arr.append(classLabels[classIndex-1])
    rgb_img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    rgb_img[:, :, [0, 2]] = rgb_img[:, :, [2, 0]]
    retval, buffer = cv2.imencode('.jpg', rgb_img)
    data = base64.b64encode(buffer).decode('utf-8')
    return [data,arr]

