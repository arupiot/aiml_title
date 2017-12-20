#AIML tracking visualisation

Using the OpenCV Processing library to do background subtraction and identify features such as faces and human bodies.

##Prerequisites

It is necessary to install the OpenCV and video libraries in Processing.

##Installation on Linux

On some Linux distributions (Ubuntu for instance) some libraries needed by the Processing video library are not installed by default.

The following steps need to be run with root privileges on Ubuntu 16.10:

```
$ sudo apt install libgstreamer*dev

$ sudo apt install gstreamer0.10-plugins-good
```

