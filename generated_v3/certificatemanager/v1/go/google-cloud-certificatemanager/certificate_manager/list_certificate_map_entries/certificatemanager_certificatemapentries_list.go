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

// [START certificatemanager_v1_certificatemanager_certificatemapentries_list]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	"google.golang.org/api/iterator"
)

// listCertificateMapEntries retrieves all certificate map entries within a certificate map.
func listCertificateMapEntries(ctx context.Context, w io.Writer, projectID string, locationID string, certificateMapID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/certificateMaps/%s", projectID, locationID, certificateMapID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.ListCertificateMapEntriesRequest{
		Parent: parent,
	}

	it := client.ListCertificateMapEntries(ctx, req)
	for {
		entry, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate certificate map entries: %w", err)
		}

		fmt.Fprintf(w, "Entry: %s\n", entry.GetName())
		fmt.Fprintf(w, "  Host: %s\n", entry.GetHostname())
		fmt.Fprintf(w, "  State: %s\n", entry.GetState())
	}

	return nil
}

// [END certificatemanager_v1_certificatemanager_certificatemapentries_list]
