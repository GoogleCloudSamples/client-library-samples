// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START certificatemanager_v1_certificatemanager_certificate_create]

import (
	"context"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"fmt"
	"io"
	"math/big"
	"time"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// createCertificate creates a certificate in Certificate Manager.
func createCertificate(ctx context.Context, w io.Writer, projectID string, locationID string, certificateID string) error {
	// Generate a self-signed certificate and private key to configure a self-managed certificate.
	priv, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		return fmt.Errorf("rsa.GenerateKey failed: %w", err)
	}

	keyPEM := pem.EncodeToMemory(&pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(priv),
	})

	template := &x509.Certificate{
		SerialNumber: big.NewInt(1),
		Subject: pkix.Name{
			CommonName: "example.com",
		},
		NotBefore: time.Now().Add(-1 * time.Hour),
		NotAfter:  time.Now().Add(24 * time.Hour),
	}

	certDER, err := x509.CreateCertificate(rand.Reader, template, template, &priv.PublicKey, priv)
	if err != nil {
		return fmt.Errorf("x509.CreateCertificate failed: %w", err)
	}

	certPEM := pem.EncodeToMemory(&pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certDER,
	})

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	certificate := &certificatemanagerpb.Certificate{
		Type: &certificatemanagerpb.Certificate_SelfManaged{
			SelfManaged: &certificatemanagerpb.Certificate_SelfManagedCertificate{
				PemCertificate: string(certPEM),
				PemPrivateKey:  string(keyPEM),
			},
		},
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.CreateCertificateRequest{
		Parent:        parent,
		CertificateId: certificateID,
		Certificate:   certificate,
	}

	op, err := client.CreateCertificate(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCertificate failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created certificate: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificate_create]
