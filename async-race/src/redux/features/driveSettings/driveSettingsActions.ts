import { createAction } from '@reduxjs/toolkit';

const setImmediateDriveMode = createAction<{ id: number; drive: boolean }>('drive/setImmediateDriveMode');
export default setImmediateDriveMode;
