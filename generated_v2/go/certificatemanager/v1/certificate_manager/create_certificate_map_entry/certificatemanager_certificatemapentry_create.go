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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_create]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// createCertificateMapEntry creates a certificate map entry for a specific domain.
func createCertificateMapEntry(ctx context.Context, w io.Writer, projectID string, locationID string, certificateMapID string, certificateMapEntryID string, certificateID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/certificateMaps/%s", projectID, locationID, certificateMapID)
	certificateMapEntry := &certificatemanagerpb.CertificateMapEntry{
		Match: &certificatemanagerpb.CertificateMapEntry_Hostname{
			Hostname: "example.com",
		},
		Certificates: []string{
			fmt.Sprintf("projects/%s/locations/%s/certificates/%s", projectID, locationID, certificateID),
		},
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.CreateCertificateMapEntryRequest{
		Parent:                parent,
		CertificateMapEntryId: certificateMapEntryID,
		CertificateMapEntry:   certificateMapEntry,
	}

	op, err := client.CreateCertificateMapEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCertificateMapEntry failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created certificate map entry: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemapentry_create]
