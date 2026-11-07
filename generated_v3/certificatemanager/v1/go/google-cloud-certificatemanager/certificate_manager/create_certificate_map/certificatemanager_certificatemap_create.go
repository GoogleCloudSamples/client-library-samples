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

// [START certificatemanager_v1_certificatemanager_certificatemap_create]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// Use the CreateCertificateMap method.
func createCertificateMap(ctx context.Context, w io.Writer, projectID string, locationID string, certificateMapID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	certificateMap := &certificatemanagerpb.CertificateMap{
		Description: "Example certificate map",
		Labels: map[string]string{
			"env": "example",
		},
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.CreateCertificateMapRequest{
		Parent:           parent,
		CertificateMapId: certificateMapID,
		CertificateMap:   certificateMap,
	}

	op, err := client.CreateCertificateMap(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCertificateMap failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created certificate map: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemap_create]
