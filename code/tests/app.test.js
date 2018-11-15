import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/components/App';

const mockSummary = {
  title: 'Jaws',
  genre: 'horror',
  synopsis: 'there is a shark in the water',
  releaseDate: 'April 1st, 3000',
  photos: ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'],
};

let wrapper;

describe('App', () => {
  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    // window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    //   json: () => Promise.resolve(mockSummary),
    // }));
  });

  test('checks if app component has elements with class name rating-duration and main-photo-box', () => {
    // const wrapper = shallow(<App />);
    expect(wrapper.find('.rating-duration').exists()).toBe(true);
    expect(wrapper.find('.main-photo-box').exists()).toBe(true);
  });

  test('tests if initial state has given values', () => {
    // const wrapper = shallow(<App />);
    expect(wrapper.state('summary').genre).toBe('comedy');
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.state('translateValue')).toBe(0);
  });

  test('correct state after fetch in componentDidMount', () => {
    // const wrapper = shallow(<App />);

    Promise.resolve(wrapper.instance().componentDidMount())
      .then(() => {
        wrapper.update();
      })
      .then(() => {
        expect(wrapper.state('summary')).toEqual({
          title: 'Jaws',
          genre: 'horror',
          synopsis: 'there is a shark in the water',
          releaseDate: 'April 1st, 3000',
          photos: ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'],
        });
      })
      .catch(error => console.error(error));
  });

  test('catches error if fetch fails', () => {
    // const wrapper = shallow(<App />);
    window.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(
      new Error('failed'),
    ));
    Promise.resolve(wrapper.instance().componentDidMount())
      .then(() => {
        wrapper.update();
      })
      // .then(() => {
      //   expect(wrapper.state('summary')).toEqual({
      //     title: 'wedding crashers',
      //     genre: 'comedy',
      //     releaseDate: 'June 20th, 2000',
      //     photos: [],
      //     synopsis: '',
      //   });
      // })
      .catch(() => {
        expect(wrapper.state('summary').title).toBe('ERROR: COULD NOT RETRIEVE DATA');
      });
  });

  test('check if nextPhoto function changes the state', () => {
    // const wrapper = shallow(<App />);
    wrapper.state('summary').photos = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
    wrapper.instance().nextPhoto();
    expect(wrapper.state('index')).toBe(1);
    expect(wrapper.state('translateValue')).toBe(-100);
  });

  test('check that nextPhoto function does not change state when carousel is at end', () => {
    // const wrapper = shallow(<App />);
    wrapper.state('summary').photos = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
    wrapper.instance().nextPhoto();
    wrapper.instance().nextPhoto();
    wrapper.instance().nextPhoto();
    expect(wrapper.state('index')).toBe(2);
    expect(wrapper.state('translateValue')).toBe(-200);
  });

  test('check that nextPhoto function does not change state when there are less than three photos', () => {
    // const wrapper = shallow(<App />);
    wrapper.instance().nextPhoto();
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.state('translateValue')).toBe(0);
  });

  test('check if prevPhoto function changes the state', () => {
    // const wrapper = shallow(<App />);
    wrapper.state('summary').photos = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
    wrapper.instance().nextPhoto();
    wrapper.instance().prevPhoto();
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.state('translateValue')).toBe(0);
  });

  test('check that prevPhoto function does not change state when index is at zero', () => {
    // const wrapper = shallow(<App />);
    wrapper.instance().prevPhoto();
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.state('translateValue')).toBe(0);
  });

  test('check if handleMouseEnter function changes class of main photo', () => {
    // const wrapper = shallow(<App />);
    wrapper.instance().handleMouseEnter();
    expect(wrapper.find('.mouseEnter').exists()).toBe(true);
    expect(wrapper.find('.main-photo').exists()).toBe(false);
  });

  test('check if handleMouseLeave function restores class of main photo', () => {
    // const wrapper = shallow(<App />);
    wrapper.instance().handleMouseEnter();
    wrapper.instance().handleMouseLeave();
    expect(wrapper.find('.main-photo').exists()).toBe(true);
    expect(wrapper.find('.mouseEnter').exists()).toBe(false);
  });
});
