export const ActionTypes = {
  FETCH_GAME: 'FETCH_GAME',
  ANSWER_STAGE: 'ANSWER_STAGE',
  VOTE_STAGE: 'VOTE_STAGE',
  SCORE_STAGE: 'SCORE_STAGE',
};

export function fetchGame(socket) {
  return (dispatch) => {
    socket.on('game', (game) => {
      dispatch({
        type: ActionTypes.FETCH_GAME,
        payload: game,
      });
    });
  };
}
// Unsure how best to transition to new stage rn, both on server and on frontend - Stephen.
// For now, these are the events we are listening to

// This isn't implemented (on server but is easy) and maybe we don't need it?!? - Stephen


export function voteStage(socket) {
  return socket.on('vote', (game) => {
    return {
      type: ActionTypes.VOTE_STAGE,
      payload: game,
    };
  });
}

// This isn't implemented (on server) - Stephen
export function scoreStage(socket) {
  return socket.on('score', (game) => {
    return {
      type: ActionTypes.SCORE_STAGE,
      payload: game,
    };
  });
}

// What is this? Doesn't exist rn - Stephen
export function restartGame() {
  return {
    type: ActionTypes.RESTART_GAME,
    payload: null,
  };
}
