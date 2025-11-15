// Simple global state (minimal store pattern)
// In production, consider using Zustand or Redux Toolkit

let state = {
  user: null,
  notifications: []
}

const listeners = []

export function subscribe(listener) {
  listeners.push(listener)
  return () => {
    listeners.splice(listeners.indexOf(listener), 1)
  }
}

function notify() {
  listeners.forEach(l => l(state))
}

export function getState() {
  return state
}

export function setState(updates) {
  state = { ...state, ...updates }
  notify()
}

export function setUser(user) {
  setState({ user })
}

export function addNotification(msg) {
  setState({ notifications: [...state.notifications, msg] })
}
