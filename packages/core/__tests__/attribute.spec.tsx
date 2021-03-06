import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '../src/index';

/** @jsx jsx */
const jsx = nt.bind(React.createElement, { Fragment });

const visibility = nt.defineAttribute<boolean>((props, children, option) => {
  const { args } = option;
  if (!args?.[0]) {
    if (!props.style) {
      props.style = {};
    }

    if (Array.isArray(props.style)) {
      props.style.push({ visibility: 'hidden' });
    } else {
      props.style.visibility = 'hidden';
    }
  }

  return nt.renderPrevAttr(props, children, option);
});

const TestVisible: React.FC<{ visibility: boolean }> = props => {
  return <i {...visibility(props.visibility)}>test</i>;
};

describe('visibility attribute', function() {
  const app = mount(<TestVisible visibility={false} />);

  it('visibility false', () => {
    expect(app.html()).toContain('<i style="visibility: hidden;">test</i>');
  });

  const app2 = mount(<TestVisible visibility />);

  it('visibility true', () => {
    expect(app2.html()).toContain('<i>test</i>');
  });
});

const wrapSpan = nt.defineAttribute<boolean>((props, children, option) => {
  return <span>{nt.renderPrevAttr(props, children, option)}</span>;
});

const wrapDiv = nt.defineAttribute<boolean>((props, children, option) => {
  return <div>{nt.renderPrevAttr(props, children, option)}</div>;
});

const TestWrapSpanFirst: React.FC<{ visible: boolean }> = props => {
  return (
    <i {...wrapSpan()} {...wrapDiv()} {...visibility(props.visible)}>
      test
    </i>
  );
};

const TestWrapDivFirst: React.FC<{ visible: boolean }> = props => {
  return (
    <i {...wrapDiv()} {...visibility(props.visible)} {...wrapSpan()}>
      test
    </i>
  );
};

describe('wrap element', function() {
  const app = mount(<TestWrapSpanFirst visible={false} />);

  it('wrapSpan first', () => {
    expect(app.html()).toContain('<span><i style="visibility: hidden;">test</i></span>');
  });

  const app2 = mount(<TestWrapDivFirst visible={false} />);

  it('wrapDiv first', () => {
    expect(app2.html()).toContain('<div><i style="visibility: hidden;">test</i></div>');
  });
});
