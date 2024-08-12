import { auth, db } from '../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getServicosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'Servicos'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                criatura: doc.data().criatura,
                tipoServico: doc.data().tipoServico,
                localizacao: doc.data().localizacao,
                descricao: doc.data().descricao,
                recompensa: doc.data().recompensa,
                contratante: doc.data().contratante,
                imgUrl: doc.data().imgUrl,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}
export const getServicosUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "Servicos");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                criatura: doc.data().criatura,
                tipoServico: doc.data().tipoServico,
                localizacao: doc.data().localizacao,
                descricao: doc.data().descricao,
                recompensa: doc.data().recompensa,
                contratante: doc.data().contratante,
                imgUrl: doc.data().imgUrl,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}
export const deleteServicoFirebase = async objeto => {
    try {
        const ServicoDocRef = doc(db, 'Servicos', objeto.id)
        await deleteDoc(ServicoDocRef);
    } catch (err) {
        throw err;
    }
}
export const addServicoFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'Servicos'),
            {
                titulo: objeto.titulo,
                criatura: objeto.criatura,
                tipoServico: objeto.tipoServico,
                localizacao: objeto.localizacao,
                descricao: objeto.descricao,
                recompensa: objeto.recompensa,
                contratante: objeto.contratante,
                imgUrl: objeto.imgUrl,
                uid: objeto.uid,
                usuario: objeto.usuario,
                email: objeto.email
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}
export const updateServicoFirebase = async objeto => {
    try {
        const ServicoDocRef = doc(db, 'Servicos', objeto.id)
        await updateDoc(ServicoDocRef, {
            titulo: objeto.titulo,
            criatura: objeto.criatura,
            tipoServico: objeto.tipoServico,
            localizacao: objeto.localizacao,
            descricao: objeto.descricao,
            recompensa: objeto.recompensa,
            contratante: objeto.contratante,
            imgUrl: objeto.imgUrl,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}