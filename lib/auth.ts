import { firestore } from "./firestore";

export class Auth {
  collection = firestore.collection("auth");
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  constructor(id) {
    this.ref = this.collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
}
