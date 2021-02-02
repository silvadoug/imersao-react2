import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen externalQuestions={dbExterno.questions} externalBg={dbExterno.bg} />
    </ThemeProvider>
  );
}

QuizDaGaleraPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dbExterno: PropTypes.object.isRequired,
};

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');

  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error('Falha em pegar os dados');
    })
    .then((res) => res)
    .catch((err) => {
      throw new Error(err);
    });

  return {
    props: {
      dbExterno,
    },
  };
}
