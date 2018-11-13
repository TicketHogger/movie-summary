import React from 'react';
import { shallow } from 'enzyme';
import Photo from '../client/components/Photo';

const mockPhoto = 'photo1';

test('check if image is getting the correct prop being passed down', () => {
  const wrapper = shallow(<Photo photo={mockPhoto} />);
  expect(wrapper.find('img').props().src).toBe(mockPhoto);
});
