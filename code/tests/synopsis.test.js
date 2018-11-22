import React from 'react';
import { shallow } from 'enzyme';
import Synopsis from '../client/components/Synopsis';

const mockTitle = 'Step Brothers (2008)';
const mockSynopsis = 'so much room for activities';

test('check if the component has the correct text', () => {
  const wrapper = shallow(<Synopsis title={mockTitle} synopsis={mockSynopsis} />);
  expect(wrapper.find('h3').text()).toBe('Step Brothers (2008) Synopsis');
  expect(wrapper.find('.synopsis').text()).toBe('so much room for activities');
});
