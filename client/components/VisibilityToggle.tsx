import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Icon from './Icon';

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
            <Icon library="Ionicons" name="eye" size={30} color="black" />
        </Pressable>
    );

    const offButton = (
        <Pressable onPress={turnOn}>
            <Icon library="Ionicons" name="eye-off" size={30} color="black" />
        </Pressable>
    );

    return (
        <>{state ? onButton : offButton}</>
    )
}