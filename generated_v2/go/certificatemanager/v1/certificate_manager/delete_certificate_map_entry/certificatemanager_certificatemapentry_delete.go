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

// [START certificatemanager_v1_certificatemanager_certificatemapentry_delete]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	"cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// deleteCertificateMapEntry deletes an existing certificate map entry.
func deleteCertificateMapEntry(ctx context.Context, w io.Writer, projectID string, locationID string, certificateMapID string, certificateMapEntryID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/certificateMaps/%s/certificateMapEntries/%s", projectID, locationID, certificateMapID, certificateMapEntryID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.DeleteCertificateMapEntryRequest{
		Name: name,
	}

	op, err := client.DeleteCertificateMapEntry(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteCertificateMapEntry failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted certificate map entry: %s\n", name)
	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemapentry_delete]
