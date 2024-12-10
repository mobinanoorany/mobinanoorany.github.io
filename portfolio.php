<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Creative CV</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/aos.css?ver=1.1.0" rel="stylesheet">
    <link href="css/bootstrap.min.css?ver=1.1.0" rel="stylesheet">
    <link href="css/main.css?ver=1.1.0" rel="stylesheet">
    <noscript>
      <style type="text/css">
        [data-aos] {
            opacity: 1 !important;
            transform: translate(0) scale(1) !important;
        }
      </style>
    </noscript>
  </head>
  <body id="top">
    <header>
      <div class="profile-page sidebar-collapse">
        <nav class="navbar navbar-expand-lg fixed-top navbar-transparent bg-primary" color-on-scroll="400">
          <div class="container">
            <div class="navbar-translate"><a class="navbar-brand" href="index.html" rel="tooltip"><span style="color:#0ddfdf; font-size:24px">M</span>obina <span style="color:#0ddfdf; font-size:24px">N</span>ourani</a>
              <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-bar bar1"></span><span class="navbar-toggler-bar bar2"></span><span class="navbar-toggler-bar bar3"></span></button>
            </div>
            <div class="collapse navbar-collapse justify-content-end" id="navigation">
              <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#about">About</a></li>
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#skill">Skills</a></li>
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#portfolio">Portfolio</a></li>
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#experience">Experience</a></li>
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#education">Education</a></li>
                <li class="nav-item"><a class="nav-link smooth-scroll" href="index.html#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <div class="page-content">
      <div>
        <style>
        .page-header {
          height: 100vh;
          max-height: 1050px;
          padding: 0;
          color: #FFFFFF;
          position: relative;
          background-position: center center;
          background-size: cover; }
      .page-header   .showcase
{
  position: absolute;
  right: 0;
  width: 100%;
  min-height: 1050px;
  padding: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  transition: 0.5s;
  z-index: -1;
}
.showcase.active
{
  right: 300px;
}

.showcase video
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;

}


        </style>
        <div class="profile-page">
          <div class="wrapper">
            <div class="page-header page-header-small" >

            <div class="page-header-image" data-parallax="true" style="background-image: url('images/bc5 (2).jpg')"></div>
            <div class="container">
              <div class="content-center">
                <div class="cc-profile-image"><a href="#"><img src="images/mobina.jpg" alt="Image"/></a></div>
                <div class="h2 title">Mobina Nourani</div>
                <p class="category text-white">AI Researcher, Computer Vision Developer</p><a class="btn btn-primary" href="" data-aos="zoom-in" data-aos-anchor="data-aos-anchor">Download CV</a>
              </div>
            </div>

            </div>
          </div>
        </div>
        <div class="section" id="about">
          <div class="container">
            <div class="card" data-aos="fade-up" data-aos-offset="10">
              <div class="row">
                <div class="col-lg-12 col-md-12">
                  <div class="card-body">

<?php
$p=$_GET['id'];

?>

                  <div style=" text-align: center;<?php if($p=='thesis'){ echo 'display:block;';}else echo 'display:none;'; ?>">
                    <div class="h4 mt-0 title" >Emotional detection from facial images with propose new activation function </div>
                      <div style=" text-align: justify; text-justify: inter-word;">
                      <p>
                        <Due to the widespread use of social networks, a large volume of images and texts are shared daily, which can be used to predict the behavior and desires of users, as well as the current state of society and some future social events by creating effective approaches to extracting knowledge.
                      </p>
                          <p> Studies have shown that the appearance of the face can have a significant impact on the judgment of social characteristics that are high-level characteristics besides some low-level features like age, gender, etc., and emotional detection like happiness, sadness, anger, etc. So that stable social traits such as honesty, trustworthiness, etc., can be deduced from the appearance of the face.
                      </p>
                      <p>
                       In this study, I used profile pictures of people which is accessible through Kaggle, and predict users' emotion and features from their faces. my goal was to combine the output results of emotion detection and some hiegh  level features with improving the outcomes of users'  facial features detection. I used a combination of machine learning and deep learning models to predict outputs from the face and trained CNN-LSTM and DCNN models. We have achieved 86% accuracy on face image data. I also introduced a new activation function that has been shown to have significant properties and compared the evaluation results of different models with the Swish activator function. It has been shown that in some cases, it has performed well in close competition with Swish.  &nbsp; &nbsp;
                        
                      </p>
                        <image src='images/Picture1.png' style="display: block;margin-left: auto;margin-right: auto;width:600px;">
                    </div>
                  </div>
                  <div style=" text-align: justify;<?php if($p=='facial'){ echo 'display:block;';}else echo 'display:none;'; ?>">
                    <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img src="images/trait.png" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">Facial trait recognition with deep learning(psychology attribute from facial image) (2021)</div>
                          <p>
                            We trained a deep neural network model on a database containing 10k natural face photographs and several measures for 2k of the faces (psychology attributes). The studies are shown that some traits can recognize from face images. We also used transfer learning in our model to extract some features and map them to 128D.
                            It contains 42 attributes from facial images that we classified.
                            we test our model on two characters of "the twilight saga" movie to show the differences in the attribute obtained from the image of their faces.</p>

                          <!-- <image src='images/trait2.PNG' style="display: block;margin-left: auto;margin-right: auto; width:500px"> -->
                              <p style="color:blue">
                              #machinelearning &nbsp;&nbsp;#deeplearning &nbsp;&nbsp;#ai&nbsp;&nbsp; #psychology&nbsp;&nbsp; #database &nbsp;&nbsp;#artificialintelligence&nbsp;&nbsp; #facialtrait&nbsp;&nbsp;
                                                      </p></div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img src="images/face2.jpg" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">Face</div>
                          <ul>
                            <li>Emotional Detection with deep learning</li>
                            <li>Face Detection and Recognition with deep learning</li>
                            <li>Age, Gender, etc. Detection from images with deep learning</li>
                          </ul>
                        </div>

                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img src="images/car.jpeg" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">Object Detection & Timeseries</div>
                          <ul>
                            <li>The similarity in time-series data with deep learning (Recurrence plot)</li>
                            <li>Predicting traffic jams from time-series data with deep learning</li>
                            <li>Car’s Plot recognition and Detection with Yolo</li>
                            <li>Object detection with RCNN</li>
                          </ul>
                        </div>

                      </div>
                    </div><br>
                    <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img style="width:262px;"src="images/nlp.png" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">NLP</div>
                          <ul>
                            <li>Persian digit recognition from handwritten images</li>
                            <li>Twitter text and image analysis with deep learning</li>
                            <li>The similarity in Persian text</li>
                            <li>Text sentiment analysis</li>
                          </ul>
                        </div>

                      </div>
                    </div>


                  </div>
                  <div style=" text-align: justify;<?php if($p=='article'){ echo 'display:block;';}else echo 'display:none;'; ?>">
                                          <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img src="images/af.gif" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">Propose new Activation Function for Neural Netwoks</div>
                          <p>We propose new activation function that it has some advantages of best activation function andgood result in neural networks.<p style="color:green">    Submited</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 " data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <img src="images/3d.jpg" alt="Image"/>

                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">Image Classification with genetic algorithm for detecting defects in additive manufacturing products</div>
                          <p>​​we want to use a genetic algorithm in image classification for flaw detection and compare the real image and the image from 3d- printing. </p><p style="color:green">    Inprogress</p>
                        </div>
                      </div>
                    </div><br>


                  </div>
                  <div style=" text-align: justify;<?php if($p=='startup'){ echo 'display:block;';}else echo 'display:none;'; ?>">
                    <div class="row">

                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                          <div class="h5">startup projects and web projects</div>

                          <ul>
                            <li>Developing an international online shop website</li>
                            <li>Designing a booking hotel website for Semnan university staff</li>
                            <li>Designing a registration website </li>
                            <li>Learned about crawling content from the Internet using some tools with PYTHON and PHP</li>
                            <li>Designing Telegram chatbot and chat page with Ajax, JavaScript, Python, PHP</li>
                            <li>Built database and module with JSON</li>
                            <li>Learned and worked with REST API</li>
                            <li>Learned about Raspberry Pi</li>


                          </ul>


                      </div>
                      </div>


                    </div>



                  </div>

              </div>
            </div>
          </div>
        </div>





    </div>
    <footer class="footer">
          <div class="h6 title text-center" style="color:#f2f2f2">Design by: <span style="color:#0ddfdf; font-size:24px">M</span>obina <span style="color:#0ddfdf; font-size:24px">N</span>ourani</div>
    </footer>
    <script src="js/core/jquery.3.2.1.min.js?ver=1.1.0"></script>
    <script src="js/core/popper.min.js?ver=1.1.0"></script>
    <script src="js/core/bootstrap.min.js?ver=1.1.0"></script>
    <script src="js/now-ui-kit.js?ver=1.1.0"></script>
    <script src="js/aos.js?ver=1.1.0"></script>
    <script src="scripts/main.js?ver=1.1.0"></script>
  </body>
</html>
