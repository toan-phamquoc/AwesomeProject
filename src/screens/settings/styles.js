import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 16
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        padding: 8
    },
    signOutText: {
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        padding: 16,
        backgroundColor: '#F8F8FF'
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    name: {
        fontSize: 20
    }
})

export default styles;
