import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';


const refreshComments = atom({
    key: 'refreshComments', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export default refreshComments;