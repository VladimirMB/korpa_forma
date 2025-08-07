<?php

// ------------------------------------------------------------------------------
// Function    : str_encrypt($string) / str_decrypt($string)
// Description : en/decrypt $data with the key in $keyfile with an rc4 algorithm 
// Return      : en/decrypted string which is URL safe
//
// NOTE: Dec 12, 2005 (Mythos and Rini) 
// - Serious problem after upgraded from 5.0.5 to 5.1.1
// Because of the base64_decode function, if there is space in the string
// it ignores it. For example:   base64_decode(string);
//
// In 5.0.5, it treats "abc" and "a bc" differently
// In 5.1.1, it treats "abc" and "a bc" the same when decode
// http://bugs.php.net/bug.php?id=35649
// The original code was:
//  urlencode(base64_encode($mystr); // PROBLEM: if there is space in mystr
// To code should have been like this:
//  base64_encode(urlencode($mystr)); // Encode any space become '+' first
// But this won't work because there are existing encrypted data in database already
// 
// Cause: $_GET automatically converts '%2B' into '+' automatically, when we
// do the urldecode, it generates the space! Now when it comes to the difference 
// between 5.0.5 vs 5.1.1 base64_decode, the result is different.
// 
// urldecode("a+bc")		// a bc	  <-- PROBLEM, base64_decode ignores the space
// urldecode("a%2Bbc");		// a+bc
// 
// Both '+' and '%2B' got the same result
// rawurldecode("a+bc")		// a+bc   <-- SOLVED
// rawurldecode("a%2Bbc");	// a+bc
// 
// ------------------------------------------------------------------------------

define("KEY_FOR_RC4", "163FHNchopETk0nakkk342EIEjOjHaifje4234Mnm5445fjiNNBZBZNAknEEKg2sadhHZKZJnbuLQhhsdjdksdsde");

function str_encrypt($str) { 

	$mystr = RC4($str, KEY_FOR_RC4);
    $mystr = rawurlencode(base64_encode($mystr));
	return $mystr;
}

function str_decrypt($str) { 

	$mystr = base64_decode(rawurldecode($str));	
	$mystr =  RC4($mystr, KEY_FOR_RC4);
	return $mystr;
}


// ------------------------------------------------------------------------------
// Function    : RC4($data, $key)
// Description : ecncrypt/decrypt $data with the key in $keyfile with an rc4 algorithm 
//               This was written by danzarrella in 2002 can be found on Zend.com
// Return      : string (encrypted/decrypted)
// ------------------------------------------------------------------------------


function RC4($data, $key) {
    $x = 0;
    $j = 0;
    $a = 0;
    $temp = "";
    $Zcrypt = "";
    $counter = [];

    // Pretvori ključ u niz bajtova (ASCII vrednosti karaktera)
    $pwd = $key;
    $pwd_length = strlen($pwd);

    $key_stream = [];

    for ($i = 0; $i < 256; $i++) {
        $key_stream[$i] = ord($pwd[$i % $pwd_length]);
        $counter[$i] = $i;
    }

    // Key-scheduling algorithm (KSA)
    for ($i = 0; $i < 256; $i++) {
        $x = ($x + $counter[$i] + $key_stream[$i]) % 256;
        $temp = $counter[$i];
        $counter[$i] = $counter[$x];
        $counter[$x] = $temp;
    }

    // Pseudo-random generation algorithm (PRGA)
    for ($i = 0; $i < strlen($data); $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $counter[$a]) % 256;

        $temp = $counter[$a];
        $counter[$a] = $counter[$j];
        $counter[$j] = $temp;

        $k = $counter[($counter[$a] + $counter[$j]) % 256];
        $Zcipher = ord($data[$i]) ^ $k;
        $Zcrypt .= chr($Zcipher);
    }

    return $Zcrypt;
}


// A general PHP rule, for library used before header must make sure no space at the end

?>