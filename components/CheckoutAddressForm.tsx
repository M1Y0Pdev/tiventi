'use client'

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CheckCircle, MapPin } from 'lucide-react';
import { addAddress, updateAddress, deleteAddress, setDefaultAddress } from '@/app/account/address-actions';
import { motion } from 'framer-motion';

// Define UserAddress type here for now, ideally this should be in types/index.ts
interface UserAddress {
    id: number;
    title: string | null;
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string | null;
    zip_code: string | null;
    country: string;
    is_default: boolean;
}

interface CheckoutAddressFormProps {
    initialAddresses: UserAddress[];
    selectedAddressId: number | null;
    onSelectAddress: (addressId: number) => void;
}

export default function CheckoutAddressForm({ initialAddresses, selectedAddressId, onSelectAddress }: CheckoutAddressFormProps) {
    const [addresses, setAddresses] = useState<UserAddress[]>(initialAddresses);
    // const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null); // Bu satır kaldırıldı
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAddresses(initialAddresses);
        // const defaultAddress = initialAddresses.find(addr => addr.is_default); // Parent component now manages selection
        // if (defaultAddress) {
        //     setSelectedAddressId(defaultAddress.id);
        // } else if (initialAddresses.length > 0) {
        //     setSelectedAddressId(initialAddresses[0].id);
        // }
    }, [initialAddresses]);

    const handleFormSubmit = async (formData: FormData) => {
        setLoading(true);
        setFormMessage(null);
        let result;
        if (editingAddress) {
            formData.append('id', editingAddress.id.toString());
            result = await updateAddress(formData);
        } else {
            result = await addAddress(formData);
        }

        if (result.success) {
            setFormMessage({ type: 'success', text: result.message });
            setShowAddressForm(false);
            setEditingAddress(null);
            // After successful add/update, parent should re-fetch addresses
        } else {
            setFormMessage({ type: 'error', text: result.message });
        }
        setLoading(false);
    };

    const handleDeleteAddress = async (addressId: number) => {
        setLoading(true);
        setFormMessage(null);
        const result = await deleteAddress(addressId);
        if (result.success) {
            setFormMessage({ type: 'success', text: result.message });
        } else {
            setFormMessage({ type: 'error', text: result.message });
        }
        setLoading(false);
    };

    const handleSetDefaultAddress = async (addressId: number) => {
        setLoading(true);
        setFormMessage(null);
        const result = await setDefaultAddress(addressId);
        if (result.success) {
            setFormMessage({ type: 'success', text: result.message });
            onSelectAddress(addressId); // Update parent's selection as well
        } else {
            setFormMessage({ type: 'error', text: result.message });
        }
        setLoading(false);
    };

    const AddressForm = () => (
        <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-4"
            action={handleFormSubmit}
        >
            {formMessage && (
                <div className={`p-3 rounded-lg text-white ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {formMessage.text}
                </div>
            )}
            <input type="text" name="title" placeholder="Adres Başlığı (Ev, İş)" defaultValue={editingAddress?.title || ''} className="w-full p-2 border rounded" required />
            <input type="text" name="full_name" placeholder="Ad Soyad" defaultValue={editingAddress?.full_name || ''} className="w-full p-2 border rounded" required />
            <input type="text" name="phone" placeholder="Telefon Numarası" defaultValue={editingAddress?.phone || ''} className="w-full p-2 border rounded" required />
            <input type="text" name="address_line1" placeholder="Adres Satırı 1" defaultValue={editingAddress?.address_line1 || ''} className="w-full p-2 border rounded" required />
            <input type="text" name="address_line2" placeholder="Adres Satırı 2 (Opsiyonel)" defaultValue={editingAddress?.address_line2 || ''} className="w-full p-2 border rounded" />
            <input type="text" name="city" placeholder="Şehir" defaultValue={editingAddress?.city || ''} className="w-full p-2 border rounded" required />
            <input type="text" name="state" placeholder="İlçe/Eyalet" defaultValue={editingAddress?.state || ''} className="w-full p-2 border rounded" />
            <input type="text" name="zip_code" placeholder="Posta Kodu" defaultValue={editingAddress?.zip_code || ''} className="w-full p-2 border rounded" />
            <input type="text" name="country" placeholder="Ülke" defaultValue={editingAddress?.country || 'Türkiye'} className="w-full p-2 border rounded" required />
            <label className="flex items-center gap-2">
                <input type="checkbox" name="is_default" defaultChecked={editingAddress?.is_default || false} className="accent-tiventi-orange" />
                <span>Varsayılan adres yap</span>
            </label>
            <div className="flex gap-4">
                <button type="submit" disabled={loading} className="bg-tiventi-orange text-white px-4 py-2 rounded disabled:opacity-50">
                    {loading ? 'Kaydediliyor...' : (editingAddress ? 'Adresi Güncelle' : 'Adres Ekle')}
                </button>
                <button type="button" onClick={() => { setShowAddressForm(false); setEditingAddress(null); setFormMessage(null); }} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
                    İptal
                </button>
            </div>
        </motion.form>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 border-b pb-4">Teslimat Adresi</h2>
            {formMessage && (
                <div className={`p-3 rounded-lg text-white mb-4 ${formMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {formMessage.text}
                </div>
            )}
            {!showAddressForm && (
                addresses.length === 0 ? (
                    <div className="text-center py-4 text-gray-600">
                        Henüz kayıtlı adresiniz bulunmamaktadır.
                        <button onClick={() => setShowAddressForm(true)} className="ml-2 text-tiventi-orange hover:underline">
                            Hemen ekleyin!
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {addresses.map(address => (
                            <div key={address.id} className={`p-4 border rounded-lg flex justify-between items-start ${selectedAddressId === address.id ? 'border-tiventi-orange ring-1 ring-tiventi-orange' : 'border-gray-200'}`}>
                                <div className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="selectedAddress" 
                                        id={`address-${address.id}`} 
                                        value={address.id} 
                                        checked={selectedAddressId === address.id} 
                                        onChange={() => onSelectAddress(address.id)}
                                        className="mr-3 accent-tiventi-orange"
                                        disabled={loading}
                                    />
                                    <label htmlFor={`address-${address.id}`} className="block cursor-pointer">
                                        <div className="font-semibold flex items-center gap-2">
                                            {address.title} - {address.full_name}
                                            {address.is_default && <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">Varsayılan</span>}
                                        </div>
                                        <p className="text-sm text-gray-600">{address.address_line1}</p>
                                        {address.address_line2 && <p className="text-sm text-gray-600">{address.address_line2}</p>}
                                        <p className="text-sm text-gray-600">{address.city} / {address.state}</p>
                                        <p className="text-sm text-gray-600">{address.phone}</p>
                                    </label>
                                </div>
                                <div className="flex gap-2 text-gray-500">
                                    <button 
                                        onClick={() => { setEditingAddress(address); setShowAddressForm(true); setFormMessage(null); }} 
                                        className="hover:text-tiventi-orange" title="Düzenle"
                                        disabled={loading}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteAddress(address.id)} className="hover:text-red-500" title="Sil" disabled={loading}><Trash2 size={18} /></button>
                                    {!address.is_default && (
                                        <button onClick={() => handleSetDefaultAddress(address.id)} className="hover:text-green-500" title="Varsayılan Yap" disabled={loading}>
                                            <CheckCircle size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { setShowAddressForm(true); setEditingAddress(null); setFormMessage(null); }} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-tiventi-orange hover:text-tiventi-orange transition-colors">
                            <Plus size={20} /> Yeni Adres Ekle
                        </button>
                    </div>
                )
            )}
            {showAddressForm && <AddressForm />}
        </div>
    );
}
