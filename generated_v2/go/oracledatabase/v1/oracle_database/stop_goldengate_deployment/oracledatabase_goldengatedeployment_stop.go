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

// [START oracledatabase_v1_oracledatabase_stop_goldengate_deployment]

import (
	"context"
	"fmt"
	"io"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// stopGoldengateDeployment stops an Oracle GoldenGate deployment.
func stopGoldengateDeployment(ctx context.Context, w io.Writer, projectID string, locationID string, goldengateDeploymentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/goldengateDeployments/%s", projectID, locationID, goldengateDeploymentID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.StopGoldengateDeploymentRequest{
		Name: name,
	}

	op, err := client.StopGoldengateDeployment(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Stopped GoldenGate deployment: %s\n", name)
			return nil
		}
		return fmt.Errorf("StopGoldengateDeployment: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Stopped GoldenGate deployment: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Stopped GoldenGate deployment: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_stop_goldengate_deployment]
