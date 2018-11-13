import React from 'react';
import { shallow } from 'enzyme';
import RightArrow from '../client/components/RightArrow';

const mockNextPhoto = jest.fn();

test('check if the props are being passed to the correct div', () => {
  const wrapper = shallow(<RightArrow nextPhoto={mockNextPhoto} />);
  expect(wrapper.find('div').props().onKeyPress).toEqual(mockNextPhoto);
  expect(wrapper.find('div').props().onClick).toEqual(mockNextPhoto);
  expect(wrapper.find('div').props().role).toBe('button');
  expect(wrapper.find('div').props().tabIndex).toBe('0');
});
