import { Tomato } from "./components/Tomato/types"

export const initialState = {
  isExtensionHidden: false,
  showHideExtensionModal: false,
  isBingoTabVisible: false,
  isBingoGameOpen: false,
  isCursorVisible: true,
  tomatoes: [],
}

//actions
export const actions = {
  HIDE_EXTENSION: "HIDE_EXTENSION",
  CANCEL_HIDE_EXTENSION: "CANCEL_HIDE_EXTENSION",

  HANDLE_ALT_SHIFT_LEFT_CLICK: "HANDLE_ALT_SHIFT_LEFT_CLICK",

  //wake/sleep
  WAKE: "WAKE",
  SLEEP: "SLEEP",

  //cursor
  SHOW_CURSOR: "SHOW_CURSOR",
  HIDE_CURSOR: "HIDE_CURSOR",

  //tomatoes
  THROW_TOMATO: "THROW_TOMATO",
  SPLATTER_TOMATO: "SPLATTER_TOMATO",
  FADE_AWAY_TOMATOES: "FADE_AWAY_TOMATOES",
  REMOVE_TOMATOES: "REMOVE_TOMATOES",

  //bingo game
  OPEN_BINGO_GAME: "OPEN_BINGO_GAME",
  CLOSE_BINGO_GAME: "CLOSE_BINGO_GAME",
}

//reducer
export function reducer(state: any, action: any) {
  switch (action.type) {
    case actions.HIDE_EXTENSION:
      return {
        ...state,
        isExtensionHidden: true,
        showHideExtensionModal: false,
        isBingoTabVisible: false,
        isBingoGameOpen: false,
        tomatoes: [],
      }
    case actions.CANCEL_HIDE_EXTENSION:
      return {
        ...state,
        showHideExtensionModal: false,
      }
    case actions.HANDLE_ALT_SHIFT_LEFT_CLICK:
      if(state.isExtensionHidden) {
        return {
          ...state,
          isExtensionHidden: false,
          showHideExtensionModal: false,
        }
      }
      return {
        ...state,
        showHideExtensionModal: true,
      }
    //WAKE/SLEEP
    case actions.WAKE:
      return {
        ...state,
        isBingoTabVisible: true,
      }
    case actions.SLEEP:
      return {
        ...state,
        isBingoTabVisible: false,
        isBingoGameOpen: false,
      }
    case actions.SHOW_CURSOR:
      return {
        ...state,
        isCursorVisible: true,
      }
    case actions.HIDE_CURSOR:
      return {
        ...state,
        isCursorVisible: false,
      }
    //BINO GAME
    case actions.OPEN_BINGO_GAME:
      return {
        ...state,
        isBingoGameOpen: true,
      }
    case actions.CLOSE_BINGO_GAME:
      return {
        ...state,
        isBingoGameOpen: false,
      }
    //TOMATOES
    case actions.THROW_TOMATO:
      return {
        ...state,
        tomatoes: [...state.tomatoes, action.payload]
      }
    case actions.SPLATTER_TOMATO:
      return {
        ...state,
        tomatoes: state.tomatoes.map((tomato: Tomato) => {
          if(tomato === action.payload) {
            return {
              ...tomato,
              splatter: true
            }
          }
          return tomato
        }
      )}
    case actions.FADE_AWAY_TOMATOES:
      return {
        ...state,
        tomatoes: state.tomatoes.map((tomato: Tomato) => {
          return {
            ...tomato,
            fadeAway: true
          }
        })
      }
    case actions.REMOVE_TOMATOES:
      return {
        ...state,
        tomatoes: []
      }

  }
}
