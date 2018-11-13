import React from 'react';
import { shallow } from 'enzyme';
import LeftArrow from '../client/components/LeftArrow';

test('check if leftArrow has exactly one div in it', () => {
  const wrapper = shallow(<LeftArrow prevPhoto={jest.fn()} />);
  expect(wrapper.find('div')).toHaveLength(1);
});
