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

// [START metastore_v1alpha_dataprocmetastore_metadataimport_get]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1beta"
	metastorepb "cloud.google.com/go/metastore/apiv1beta/metastorepb"
)

// Use the GetMetadataImport method.
func getMetadataImport(ctx context.Context, w io.Writer, locationID string, serviceID string, metadataImportID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/services/%s/metadataImports/%s", projectID, locationID, serviceID, metadataImportID)

	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &metastorepb.GetMetadataImportRequest{
		Name: name,
	}

	resp, err := client.GetMetadataImport(ctx, req)
	if err != nil {
		return fmt.Errorf("GetMetadataImport failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved metadata import: %s\n", resp.GetName())
	return nil
}

// [END metastore_v1alpha_dataprocmetastore_metadataimport_get]
