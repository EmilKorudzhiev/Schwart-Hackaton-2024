import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';

interface VisibilityToggleProps<E> {
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>

}

export default function VisiblityToggle<E>({state, setState}: VisibilityToggleProps<E>) {
    const turnOff = () => {
        setState(false);
    };
    
    const turnOn = () => {
        setState(true);
    };

    const onButton = (
        <Pressable onPress={turnOff}>
            <AntDesign name="eyeo" size={48} color="black" />
        </Pressable>
    );

    const offButton = (
        <Pressable onPress={turnOn}>
            <AntDesign name="eye" size={48} color="black" />
        </Pressable>
    );

    return (
        <>{state ? onButton : offButton}</>
    )
}