import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
    GoogleAuthProvider,
    GithubAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
const firebaseConfig = {
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); // Adiciona o Firebase Storage
//export default firebaseApp;

const googleProvider = new GoogleAuthProvider();

const gitProvider = new GithubAuthProvider();

const signInWithGit = async () => {
try {
      const res = await signInWithPopup(auth, gitProvider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
};

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};



const logInWithEmailAndPassword = async (email, password) => {
    try {
        // Fazer o login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Obter o documento do usuário da coleção 'users'
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Atualizar o displayName no Firebase Authentication
            if (user.displayName !== userData.displayName) {
                await updateProfile(user, { displayName: userData.displayName });
            }

            // Atualizar o displayName no Firestore (se necessário)
            // Se você quiser atualizar o nome do usuário com base em outras condições
            // await updateDoc(userDocRef, { displayName: userData.displayName });

            console.log('Nome de usuário atualizado com sucesso!');
        } else {
            console.log('Nenhum documento encontrado para o usuário.');
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        let displayName = name;
        // Atualizar o displayName do usuário
        await updateProfile(user, { displayName });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    storage,
    signInWithGit
};