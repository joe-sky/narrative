import React, { Component, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '../src/index';

/** @jsx jsx */
const jsx = nt.bind<React.ReactElement>(React.createElement, React.Fragment);

xdescribe('custom attributes', function() {});
