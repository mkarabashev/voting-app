import WINDOW_SIZE_CHANGED from '../constants';

const windowSizeChanged = width => ({ type: WINDOW_SIZE_CHANGED, width });

export default windowSizeChanged;
