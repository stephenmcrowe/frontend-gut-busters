export const ActionTypes = {
  FETCH_GAME: 'FETCH_GAME',
  ANSWER_STAGE: 'ANSWER_STAGE',
  VOTE_STAGE: 'VOTE_STAGE',
  SCORE_STAGE: 'SCORE_STAGE',
  OTHER: 'OTHER',
};

export function setGame(game) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.FETCH_GAME,
      payload: game,
    });
  };
}

export function setVote(index) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.VOTE_STAGE,
      payload: index,
    });
  };
}

export function fetchGame(socket) {
  return (dispatch) => {
    socket.on('game', (game) => {
      dispatch({
        type: ActionTypes.OTHER,
        payload: game,
      });
    });
  };
}
