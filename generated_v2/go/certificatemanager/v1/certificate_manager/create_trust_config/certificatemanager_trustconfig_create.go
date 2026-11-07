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

// [START certificatemanager_v1_certificatemanager_trustconfig_create]

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
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

// createTrustConfig creates a trust config resource.
func createTrustConfig(ctx context.Context, w io.Writer, projectID string, locationID string, trustConfigID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	// Generate a valid self-signed CA certificate for the trust anchor.
	priv, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return fmt.Errorf("ecdsa.GenerateKey failed: %w", err)
	}

	template := &x509.Certificate{
		SerialNumber: big.NewInt(1),
		Subject: pkix.Name{
			CommonName: "Example Trust Anchor",
		},
		NotBefore:             time.Now().Add(-1 * time.Hour),
		NotAfter:              time.Now().Add(365 * 24 * time.Hour),
		IsCA:                  true,
		KeyUsage:              x509.KeyUsageCertSign | x509.KeyUsageCRLSign,
		BasicConstraintsValid: true,
	}

	certDER, err := x509.CreateCertificate(rand.Reader, template, template, &priv.PublicKey, priv)
	if err != nil {
		return fmt.Errorf("x509.CreateCertificate failed: %w", err)
	}

	certPEM := pem.EncodeToMemory(&pem.Block{
		Type:  "CERTIFICATE",
		Bytes: certDER,
	})

	anchor := &certificatemanagerpb.TrustConfig_TrustAnchor{
		Kind: &certificatemanagerpb.TrustConfig_TrustAnchor_PemCertificate{
			PemCertificate: string(certPEM),
		},
	}
	trustStore := &certificatemanagerpb.TrustConfig_TrustStore{
		TrustAnchors: []*certificatemanagerpb.TrustConfig_TrustAnchor{anchor},
	}
	trustConfig := &certificatemanagerpb.TrustConfig{
		Description: "Example Trust Config",
		TrustStores: []*certificatemanagerpb.TrustConfig_TrustStore{trustStore},
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.CreateTrustConfigRequest{
		Parent:        parent,
		TrustConfigId: trustConfigID,
		TrustConfig:   trustConfig,
	}

	op, err := client.CreateTrustConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTrustConfig failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created TrustConfig: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_trustconfig_create]
