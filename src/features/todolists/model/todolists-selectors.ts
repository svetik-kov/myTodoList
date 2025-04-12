
import type { RootState } from 'src/app/store.ts'
import {Todolist} from '@/features/todolists/model/todolists-reducer.ts';

export const selectTodolists = (state: RootState): Todolist[] => state.todolists