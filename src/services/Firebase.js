import firebase from "react-native-firebase";

class MyFirebase {
  constructor() {
  }

  signIn(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        return user;
      })
      .catch(error => { throw new Error(error) });
  }

  signUp(email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        this.storeUserProfile({ email: user.email, displayName: user.displayName, phoneNumber: user.phoneNumber, photoURL: 'https://firebasestorage.googleapis.com/v0/b/awesomeproject-6d350.appspot.com/o/avatar%2Fmedium-default-avatar.png?alt=media&token=71479c78-862a-4916-ab17-9948b7e61bb2' })
        return user;
      }).catch(error => { throw new Error(error) });
  }

  get ref() {
    return firebase.database().ref('Messages/');
  }

  // on = callback => {
  //   console.log('on>>', this.ref.limitToLast(20));
  //   this.ref
  //     .limitToLast(20)
  //     .on('child_added', (snapshot) => {
  //       callback(this.parse(snapshot));
  //     });
  // };
  // parse = snapshot => {

  //   const { timestamp: numberStamp, text, user } = snapshot.val();
  //   const { key: _id } = snapshot;
  //   const timestamp = new Date(numberStamp);
  //   const message = {
  //     _id,
  //     timestamp,
  //     text,
  //     user,
  //   };
  //   console.log('snapshot>>', snapshot.val());
  //   console.log('message>>', message);
  //   return message;
  // }
  off() {
    this.ref.off();
  }

  getCurrentUser() {
    return this.getUserProfile(this.uid);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get GiftedChatUser() {
    const user = firebase.auth().currentUser;
    return user ?
      {
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL
      } : null;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  async getAllUser() {
    console.log('get all users');
    let rs = [];

    await firebase.firestore()
      .collection(`Users`)
      .get().then((querySnapshot) => {
        rs = querySnapshot.docs.map(doc => doc.data());
      }).catch(error => { throw new Error(error) });

    return rs;
  }

  getConversationId(userIds) {

    firebase.database().ref('Chats/Users').push(['aa545a', 'w4545a'])
    firebase.database().ref('Chats/Users').once('value', snapshot => {
      // snap.forEach((child) => {
      //   if(child.val())
      //   items.push({
      //     title: child.val().title,
      //     _key: child.key
      //   });
      // });

      console.log('data>>', snapshot.val())
    });
  }

  getLastMessages = async (receiverId) => {
    const childPath = this.uid > receiverId ? this.uid + receiverId : receiverId + this.uid;
    try {
      let rs = [];
      const snapshot = await firebase.database().ref(`Messages/${childPath}`).limitToLast(10).once('value');
      snapshot.forEach((obj) => {
        if (obj) {
          rs.push(obj.val());
        }
      });
      return rs
    } catch (error) {
      throw new Error(error)
    }
  };

  sendMessage = (messages, receiverId) => {
    const childPath = this.uid > receiverId ? this.uid + receiverId : receiverId + this.uid;
    firebase.database().ref('Messages')
      .child(childPath)
      .push(messages)
      .catch(error => { throw new Error(error) });
  };

  updateProfile(profile) {
    console.log('update profile');
    firebase.auth()
      .currentUser
      .updateProfile({
        displayName: 'Kuga',
        photoURL: 'https://www.upsieutoc.com/images/2019/01/25/e0842f44-9baf-4cd7-9440-b02a05e1c334.th.png'
      }).catch(error => { throw new Error(error) });
  }

  storeUserProfile(profile) {
    console.log('store profile');
    firebase.firestore()
      .collection(`Users`)
      .doc(`${this.uid}`)
      .set({
        uid: this.uid,
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        email: profile.email,
        phoneNumber: profile.phoneNumber
      }).catch(error => { throw new Error(error) });
  }

  getUserProfile(uid) {
    console.log('get a user profile');
    return firebase.firestore()
      .collection(`Users`)
      .doc(uid)
      .get().then(doc => { return doc.data() })
      .catch(error => { throw new Error(error) });
  }
}

export default new MyFirebase();
