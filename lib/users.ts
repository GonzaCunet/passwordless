import { firestore } from "./firestore";

export class User {
  collection = firestore.collection("users");
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  constructor(id) {
    this.ref = this.collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
}
