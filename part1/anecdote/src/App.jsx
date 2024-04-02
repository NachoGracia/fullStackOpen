import { useState } from "react";

const randomAnecdote = () => {
  return Math.floor(Math.random() * 8);
};
const votesAnecdotes = Array(8).fill(0);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesAnecdotes);

  const nextAnecdote = () => {
    setSelected(randomAnecdote());
  };
  const vote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };
  const mostVoted = votes.indexOf(Math.max(...votes));
  console.log("🚀 ~ App ~ mostVoted:", mostVoted);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <h3>has {votes[selected]}</h3>
      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <h3>{anecdotes[mostVoted]}</h3>
      </div>
    </>
  );
};

export default App;
