
Simple File Rotator
===================

[![NPM](https://nodei.co/npm/simple-file-rotator.png)](https://nodei.co/npm/simple-file-rotator/)

A simple, no-dependency, asynchroneous file rotating library for Node.js.

What is it?
===========

This library rotates a set of files on the filesystem.  

The module will export a single function, called `rotate(filename, N)`.  
Everytime it is called, it will rotate the given filename once.  

In more detail:
- It will permanently delete `filename.N`
- It will rename `filename.I` to `filename.(I+1)`, for `0 <= I < N`
- It will rename `filename` to `filename.0`.
If any of the files are missing, they will be skipped.

This is mostly useful for rotating log files, where it is handy to keep a certain number of logs available on the filesystem.  
Contrary to rotations by date or by size, this ensures that a single file is kept per execution.

It can also be useful for tests: 
assuming a library always write to a given filename, it can be useful to check wether the output is the same on two different runs.
To do that, simply rotatie the file between the two runs and check for differences between `filename` and `filename.0`.


Usage
=====

Using this library is as simple as requiring and invoking it with the filename and the number of rotations to make.

```
let rotate = require('simple-file-rotator');
let filename = 'debug.log', N = 3;
rotate(filename, N).then( ... );
```

Each time the `rotate` function is called, the file `debug.log` gets rotated (assuming it exists).  
It will take on the following names during the course of multiple invocations to `rotate`:  
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


