# Detectify

Detectify is a web application built using React and Flask that utilizes computer vision to detect objects in transportation-based images. The application uses OpenCV (cv2) for image processing and a frozen inference graph as a model for object detection.

## Features

- Detect objects in transportation-based images.
- Utilizes OpenCV (cv2) for image processing.
- Uses a frozen inference graph for object detection.

## Installation

To run Detectify locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/aj0911/detectify.git
    cd detectify
    ```

2. Install dependencies:

    ```bash
    # Navigate to the frontend directory
    cd frontend
    npm install

    # Navigate to the backend directory
    cd ../backend
    pip install -r requirements.txt
    ```

3. Run the development server:

    ```bash
    # Start the React development server
    cd frontend
    npm start

    # Start the Flask backend server in a separate terminal
    cd ../backend
    python app.py
    ```

4. Access Detectify in your web browser at `http://localhost:3000`.

## Usage

1. Upload an image containing transportation objects.
2. Click on the "Detect" button to initiate object detection.
3. View the detected objects highlighted in the uploaded image.

## Technologies Used

- React
- Flask
- OpenCV (cv2)
- Frozen Inference Graph (for object detection)

## Demo

Check out the demo of Detectify `DemoVideo.mp4` and download it as a raw file

## Credits

Detectify was created by Abhinav Jha.

