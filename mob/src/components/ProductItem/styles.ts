import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e6e6fa',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    title: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },

    avatar: {
        width: 90,
        height: 90,
        backgroundColor: '#eee'
    },
    profileInfo: {
        marginLeft: 16,
    },
    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264d',
        fontSize: 20,
        flex: 1, 
        flexWrap: 'wrap'
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
    bio: {
        margin: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6a6180'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%'
    },
    more: {
        fontSize: 30
    },
    price: {
        fontFamily: 'Poppins_400Regular',
        color: "#6a6180",
        fontSize: 14
    },
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257e5',
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    favoriteButton: {
        backgroundColor: '#8257e5',
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    favorited: {
        backgroundColor: '#e33d3d'
    },
    contactButton: {
        backgroundColor: '#04d361',
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    contactButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 16
    },
    myStarStyle: {
        color: '#8257e5',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowRadius: 2,
        fontSize: 20
    },
    myEmptyStarStyle: {
        color: '#8257e5',
    }

});

export default styles;