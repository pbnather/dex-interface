import { useMemo } from "react"
import { kebabCase } from 'lodash'
import { useDispatch } from "react-redux"
/* eslint-disable no-param-reassign */
import { Toast, toastTypes } from "trinityhelper"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ToastsState {
    data: Toast[]
  }

const initialState: ToastsState = {
  data: [],
}

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    push: (state: ToastsState, action: PayloadAction<Toast>) => {
      const { payload } = action
      const toastIndex = state.data.findIndex((toast) => toast.id === action.payload.id)

      // If id already matches remove it before adding it to the top of the stack
      if (toastIndex >= 0) {
        state.data.splice(toastIndex, 1)
      }

      state.data.unshift(payload)
    },
    remove: (state: ToastsState, action: PayloadAction<string>) => {
      const toastIndex = state.data.findIndex((toast) => toast.id === action.payload)

      if (toastIndex >= 0) {
        state.data.splice(toastIndex, 1)
      }
    },
    clear: (state: ToastsState) => {
      state.data = []
    },
  },
})

// Actions
export const { clear, remove, push } = toastsSlice.actions

export default toastsSlice.reducer


export const useToast = () => {
    const dispatch = useDispatch()
    const helpers = useMemo(() => {
      // eslint-disable-next-line
      const push = (toast: Toast) => dispatch(push(toast))
  
      return {
        toastError: (title: string, description?: string) => {
          return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
        },
        toastInfo: (title: string, description?: string) => {
          return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
        },
        toastSuccess: (title: string, description?: string) => {
          return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
        },
        toastWarning: (title: string, description?: string) => {
          return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
        },
        push,
        remove: (id: string) => dispatch(remove(id)),
        clear: () => dispatch(clear()),
      }
    }, [dispatch])
  
    return helpers
  }
