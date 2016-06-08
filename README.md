µLogger
=====

_WORK IN PROGRESS_

An asynchronous NodeJS logging framework that supports multiple transports and is designed for use in a microservices environment. 

There are quite a few logging frameworks out there, but one short-coming of these loggers is their lack of an ability to emit structured log data to various sources AND allow for a **correlation id** (aka **transaction id**) to log messages to group together the log messages of services across service boundaries. Most logging frameworks are also not that ES6+ friendly.

# Features

**Note:** This project is under active development and this list of features reflects what the final package will have.

* Built with ES6+ as a first-class citizen
* Logging API similar to `console`
* Fully asynchronous
* Log to multiple transports via a structured a simple adapter model
* Attach correlation ids to log events without polluting your call stack
* Colorized console output
* Configurable formats for console and other transports
* Simple configuration and customization

# Installation

*Coming soon*

# Usage

*Coming soon*
