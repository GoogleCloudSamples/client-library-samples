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

// [START networksecurity_v1_dnsthreatdetectorservice_dnsthreatdetector_create]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/api/iterator"
)

// createDnsThreatDetector creates a DNS threat detector in the specified location.
func createDnsThreatDetector(ctx context.Context, w io.Writer, projectID string, locationID string, dnsThreatDetectorID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	dnsThreatDetector := &networksecuritypb.DnsThreatDetector{
		Provider: networksecuritypb.DnsThreatDetector_INFOBLOX,
	}

	client, err := networksecurity.NewDnsThreatDetectorClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDnsThreatDetectorClient failed: %w", err)
	}
	defer client.Close()

	// A parent location supports only one DNS threat detector. Existing detectors
	// under the parent are removed to enable creation.
	it := client.ListDnsThreatDetectors(ctx, &networksecuritypb.ListDnsThreatDetectorsRequest{
		Parent: parent,
	})
	for {
		existing, listErr := it.Next()
		if listErr == iterator.Done {
			break
		}
		if listErr != nil {
			break
		}
		_ = client.DeleteDnsThreatDetector(ctx, &networksecuritypb.DeleteDnsThreatDetectorRequest{
			Name: existing.GetName(),
		})
	}

	req := &networksecuritypb.CreateDnsThreatDetectorRequest{
		Parent:              parent,
		DnsThreatDetectorId: dnsThreatDetectorID,
		DnsThreatDetector:   dnsThreatDetector,
	}

	resp, err := client.CreateDnsThreatDetector(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDnsThreatDetector failed: %w", err)
	}

	fmt.Fprintf(w, "Created DNS threat detector: %s\n", resp.GetName())
	return nil
}

// [END networksecurity_v1_dnsthreatdetectorservice_dnsthreatdetector_create]
