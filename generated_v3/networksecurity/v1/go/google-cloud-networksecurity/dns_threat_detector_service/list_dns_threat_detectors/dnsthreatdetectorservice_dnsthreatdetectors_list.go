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

// [START networksecurity_v1_dnsthreatdetectorservice_dnsthreatdetectors_list]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1beta1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1beta1/networksecuritypb"
	"google.golang.org/api/iterator"
)

// listDnsThreatDetectors lists the DNS threat detectors in a specified location.
func listDnsThreatDetectors(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networksecurity.NewDnsThreatDetectorClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDnsThreatDetectorClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.ListDnsThreatDetectorsRequest{
		Parent: parent,
	}

	it := client.ListDnsThreatDetectors(ctx, req)
	count := 0
	for {
		detector, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("iteration failed: %w", err)
		}
		fmt.Fprintf(w, "DNS Threat Detector: %s\n", detector.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintf(w, "No DNS threat detectors found in %s\n", parent)
	}

	return nil
}

// [END networksecurity_v1_dnsthreatdetectorservice_dnsthreatdetectors_list]
