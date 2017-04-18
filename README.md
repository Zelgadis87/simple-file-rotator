
Simple File Rotator
===================

[![NPM](https://nodei.co/npm/simple-file-rotator.png)](https://nodei.co/npm/simple-file-rotator/)

A simple, no-dependency, asynchroneous file rotating library for Node.js.

What is it?
===========

This library is useful to rotate a file on the filesystem.  

The module will export a single function, called `rotate(filename, N)`.  
Everytime it is called, it will rotate the given file once, appending `.INDEX` to its name, where `0 <= INDEX <= N`.  
After `N` rotations, the file will be permanently removed from the filesystem.  

This is mostly useful for rotating log files, where it is handy to keep a certain number of logs available on the filesystem.  
Contrary to date or size rotations, this library will keep a file per execution, no matter how big or small it is.

Usage
=====

Using this library is as simple as requiring it and invoking it with a filename and number of rotations to do.

```
let rotate = require('simple-file-rotator');
let filename = 'debug.log', N = 3;
rotate(filename, N).then( ... );
```

Each time the `rotate` function is called, the file `debug.log` gets rotated (assuming it exists).  
It will assume the following names during the course of multiple invocations to `rotate`:  
`debug.log` -> `debug.log.0` -> `debug.log.1` -> ... -> `debug.log.N`.  
The file will finally be deleted on the `N`th+1 rotation.  

The returned object of `rotate` will be a Promise.  
The Promise will be resolved as soon as all the files have been rotated.  
The Promise will be rejected with an Error as soon as one of the files failed to be rotated.   
Missing files will be ignored.

Installation
============

```
npm install --save simple-file-rotator
```


