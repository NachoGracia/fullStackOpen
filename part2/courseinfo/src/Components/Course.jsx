import React from "react";

const courses = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 1,
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 2,
      },
    ],
  },
];

const Header = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <h2 key={course.id}>{course.name}</h2>
      ))}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};
const Total = ({ parts }) => {
  let sum = parts.reduce((total, part) => total + part.exercises, 0);

  return <p>Number of exercises {sum} </p>;
};

export const Course = () => {
  return (
    <>
      <div>
        <h1>Web development curriculum</h1>
      </div>
      {courses.map((course) => [
        <Header key={course.id} courses={[course]} />,
        <Content key={course.id} parts={course.parts} />,
        <Total key={course.id} parts={course.parts} />,
      ])}
    </>
  );
};
