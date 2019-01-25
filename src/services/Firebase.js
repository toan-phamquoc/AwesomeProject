import firebase from "react-native-firebase";

class MyFirebase {
  constructor() {
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

  // 3.
  sendMessage = (messages, receiverId) => {
    const childPath = this.uid > receiverId ? this.uid + receiverId : receiverId + this.uid;
    firebase.database().ref('Messages')
      .child(childPath)
      .push(messages)
      .catch(error => { throw new Error(error) });
  };

  updateProfile(profile) {
    firebase.auth()
      .currentUser
      .updateProfile({
        displayName: 'Kuga',
        photoURL: 'https://www.upsieutoc.com/images/2019/01/25/e0842f44-9baf-4cd7-9440-b02a05e1c334.th.png'
      }).catch(error => { throw new Error(error) });
  }
}
export default new MyFirebase();
