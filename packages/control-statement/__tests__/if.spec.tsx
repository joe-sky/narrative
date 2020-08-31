import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as nt from '@narrative/core';
import { If, Else, ElseIf } from '../src/index';

/** @jsx ntH */
const ntH = nt.bind(React.createElement, { Fragment });

const TestIf = props => {
  return (
    <If condition={props.condition}>
      {() => <i>test</i>}
      <Else>
        <i>test2</i>
      </Else>
    </If>
  );
};

describe('if element', function() {
  const app = mount(<TestIf condition={false} />);
  console.log(
    <nt-if condition={false}>
      test111
      <nt-elseif condition={true}>{() => 'test3'}</nt-elseif>
      <nt-else>test2</nt-else>
    </nt-if>
  );

  it('if', () => {
    expect(app.html()).toEqual('<i>test2</i>');
  });
});
