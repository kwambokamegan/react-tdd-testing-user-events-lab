import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    technology: false,
    design: false,
    marketing: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prevInterests) => ({
      ...prevInterests,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedInterests = Object.entries(interests)
      .filter(([_, checked]) => checked)
      .map(([interest]) => interest);

    // Provide an initial value to reduce
    const formattedInterests = selectedInterests.length > 1
      ? selectedInterests
          .reduce((acc, interest, index, array) => 
            index === array.length - 1 
              ? acc + ' and ' + interest 
              : acc + ', ' + interest, 
            '')  // Initial value is an empty string
      : selectedInterests[0] || '';

    setMessage(formattedInterests 
      ? `Thank you for signing up, ${name}! Your email address is ${email}. You are interested in: ${formattedInterests}.` 
      : 'No interests selected');
    
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Hi, I'm (your name)</h1>
      <img
        src="https://media.istockphoto.com/id/1177615987/photo/happy-fashionable-model-on-white-background.webp?b=1&s=612x612&w=0&k=20&c=qGuQn2Dlo_1msDg4ET4UkFHpNh46r-XgZLIAnFYz0aE="
        alt="My profile pic"
      />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div>
        <a href="https://github.com/kwambokamegan" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <fieldset>
          <legend>Interests:</legend>
          <label>
            <input
              name="technology"
              type="checkbox"
              checked={interests.technology}
              onChange={handleCheckboxChange}
            />
            Technology
          </label>
          <label>
            <input
              name="design"
              type="checkbox"
              checked={interests.design}
              onChange={handleCheckboxChange}
            />
            Design
          </label>
          <label>
            <input
              name="marketing"
              type="checkbox"
              checked={interests.marketing}
              onChange={handleCheckboxChange}
            />
            Marketing
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>{message}</p>
      )}
    </div>
  );
}

export default App;
