import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.allComments === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <h3>No feedback given</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.allComments} />
            <StatisticLine text="average" value={props.calculateAverage()} />
            <StatisticLine
              text="positive"
              value={`${props.calculatePositive()} %`}
            />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  const allComments = good + neutral + bad;
  const calculateAverage = () => {
    const totalScore = good * 1 + neutral * 0 + bad * -1;
    const newAverage = totalScore / allComments;
    return newAverage ? newAverage : 0;
  };
  const calculatePositive = () => (good * 100) / allComments;

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
      </div>
      <Button onClick={increaseGood} text={"good"}></Button>
      <Button onClick={increaseNeutral} text={"neutral"}></Button>
      <Button onClick={increaseBad} text={"bad"}></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allComments={allComments}
        calculateAverage={calculateAverage}
        calculatePositive={calculatePositive}
      />
    </>
  );
};

export default App;
