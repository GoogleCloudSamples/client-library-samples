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

// [START metastore_v1_dataprocmetastore_service_update]

import (
	"context"
	"fmt"
	"io"

	metastore "cloud.google.com/go/metastore/apiv1"
	"cloud.google.com/go/metastore/apiv1/metastorepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateService updates the configuration of an existing Dataproc Metastore service.
func updateService(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string) error {
	client, err := metastore.NewDataprocMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataprocMetastoreClient failed: %w", err)
	}
	defer client.Close()

	service := &metastorepb.Service{
		Name: fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, locationID, serviceID),
		Labels: map[string]string{
			"env": "test",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	req := &metastorepb.UpdateServiceRequest{
		UpdateMask: updateMask,
		Service:    service,
	}

	op, err := client.UpdateService(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateService failed: %w", err)
	}

	// UpdateService is a long-running operation; wait for completion.
	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated service: %s\n", resp.GetName())
	return nil
}

// [END metastore_v1_dataprocmetastore_service_update]
