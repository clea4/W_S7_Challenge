import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('Sprint 7 Challenge Learner Tests', () => {
  // TASK 1 - Unit Testing of sum function
  describe('sum function', () => {
    const sum = (a, b) => {
      a = Number(a);
      b = Number(b);
      if (isNaN(a) || isNaN(b)) {
        throw new Error('pass valid numbers');
      }
      return a + b;
    };

    test('throws error when no arguments are provided', () => {
      expect(() => sum()).toThrow('pass valid numbers');
    });

    test('throws error when one of the arguments is not a number', () => {
      expect(() => sum(2, 'seven')).toThrow('pass valid numbers');
    });

    test('returns 4 when adding 1 and 3', () => {
      expect(sum(1, 3)).toBe(4);
    });

    test('returns 3 when adding string "1" and number 2', () => {
      expect(sum('1', 2)).toBe(3);
    });

    test('returns 13 when adding string "10" and string "3"', () => {
      expect(sum('10', '3')).toBe(13);
    });
  });

  // TASK 2 - Integration Testing of HelloWorld component
  describe('<HelloWorld /> component', () => {
    function HelloWorld() {
      return (
        <div>
          <h1>Hello World Component</h1>
          <nav>
            <a href='#'>Home</a>
            <a href='#'>About</a>
            <a href='#'>Blog</a>
          </nav>
          <main>
            <section>
              <h2>The Truth</h2>
              <p>JavaScript is pretty awesome</p>
            </section>
          </main>
        </div>
      );
    }

    test('renders a link that reads "Home"', () => {
      render(<HelloWorld />);
      const homeLink = screen.queryByText('Home');
      expect(homeLink).toBeInTheDocument();
    });

    test('renders a link that reads "About"', () => {
      render(<HelloWorld />);
      const aboutLink = screen.queryByText('About');
      expect(aboutLink).toBeInTheDocument();
    });

    test('renders a link that reads "Blog"', () => {
      render(<HelloWorld />);
      const blogLink = screen.queryByText('Blog');
      expect(blogLink).toBeInTheDocument();
    });

    test('renders a text that reads "The Truth"', () => {
      render(<HelloWorld />);
      const truthText = screen.queryByText('The Truth');
      expect(truthText).toBeInTheDocument();
    });

    test('renders a text that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld />);
      const jsText = screen.queryByText('JavaScript is pretty awesome');
      expect(jsText).toBeInTheDocument();
    });

    test('renders a text that includes "JavaScript is pretty"', () => {
      render(<HelloWorld />);
      const partialText = screen.queryByText(/JavaScript is pretty/, { exact: false });
      expect(partialText).toBeInTheDocument();
    });
  });
});

  