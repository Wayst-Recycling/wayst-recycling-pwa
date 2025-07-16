export async function decryptToken({
  encryptedBase64,
  key,
}: {
  encryptedBase64: string;
  key: string;
}): Promise<string> {
  const data = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

  const iv = data.slice(0, 12);
  const authTag = data.slice(12, 28);
  const encrypted = data.slice(28);

  const rawKey = new TextEncoder().encode(key).slice(0, 32);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['decrypt'],
  );

  const ciphertextWithTag = new Uint8Array(encrypted.length + authTag.length);
  ciphertextWithTag.set(encrypted, 0);
  ciphertextWithTag.set(authTag, encrypted.length);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
      tagLength: 128,
    },
    cryptoKey,
    ciphertextWithTag,
  );

  return new TextDecoder().decode(decryptedBuffer);
}
